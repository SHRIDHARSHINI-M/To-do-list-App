import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Calendar, Flag, CircleCheck as CheckCircle } from 'lucide-react-native';
import { useTasks } from '@/hooks/useTasks';
import { useAuth } from '@/hooks/useAuth';
import { TaskForm } from '@/components/TaskForm';
import { AuthScreen } from '@/components/AuthScreen';

export default function AddTaskScreen() {
  const { user } = useAuth();
  const { createTask } = useTasks();
  const [showTaskForm, setShowTaskForm] = useState(false);

  if (!user) {
    return <AuthScreen />;
  }

  const handleCreateTask = async (taskData: any) => {
    try {
      await createTask(taskData);
      Alert.alert('Success', 'Task created successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to create task');
    }
  };

  const quickTaskTemplates = [
    {
      title: 'Work Meeting',
      description: 'Prepare for team meeting',
      priority: 'high' as const,
      icon: Calendar,
    },
    {
      title: 'Grocery Shopping',
      description: 'Buy weekly groceries',
      priority: 'medium' as const,
      icon: CheckCircle,
    },
    {
      title: 'Exercise',
      description: '30 minutes workout',
      priority: 'low' as const,
      icon: Flag,
    },
  ];

  const createQuickTask = async (template: typeof quickTaskTemplates[0]) => {
    await handleCreateTask({
      title: template.title,
      description: template.description,
      priority: template.priority,
      completed: false,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add New Task</Text>
        <Text style={styles.headerSubtitle}>Create a new task or choose from templates</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setShowTaskForm(true)}
        >
          <Plus size={24} color="#FFFFFF" />
          <Text style={styles.createButtonText}>Create Custom Task</Text>
        </TouchableOpacity>

        <View style={styles.templatesContainer}>
          <Text style={styles.templatesTitle}>Quick Templates</Text>
          {quickTaskTemplates.map((template, index) => (
            <TouchableOpacity
              key={index}
              style={styles.templateItem}
              onPress={() => createQuickTask(template)}
            >
              <View style={styles.templateIcon}>
                <template.icon size={20} color="#14B8A6" />
              </View>
              <View style={styles.templateContent}>
                <Text style={styles.templateTitle}>{template.title}</Text>
                <Text style={styles.templateDescription}>{template.description}</Text>
              </View>
              <View style={[styles.priorityIndicator, { backgroundColor: 
                template.priority === 'high' ? '#EF4444' :
                template.priority === 'medium' ? '#F59E0B' : '#10B981'
              }]} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TaskForm
        visible={showTaskForm}
        onClose={() => setShowTaskForm(false)}
        onSubmit={handleCreateTask}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#14B8A6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 32,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  templatesContainer: {
    flex: 1,
  },
  templatesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  templateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  templateIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0FDFA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  templateContent: {
    flex: 1,
  },
  templateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  templateDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});