import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircleCheck as CheckCircle, Plus } from 'lucide-react-native';

interface EmptyStateProps {
  hasCompletedTasks?: boolean;
}

export function EmptyState({ hasCompletedTasks }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <CheckCircle size={64} color="#10B981" />
      </View>
      
      <Text style={styles.title}>
        {hasCompletedTasks ? 'All done!' : 'No tasks yet'}
      </Text>
      
      <Text style={styles.description}>
        {hasCompletedTasks 
          ? 'Great job! You\'ve completed all your tasks.'
          : 'Tap the + button to create your first task'
        }
      </Text>
      
      {!hasCompletedTasks && (
        <View style={styles.hint}>
          <Plus size={20} color="#14B8A6" />
          <Text style={styles.hintText}>Create a task to get started</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  hint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F0FDFA',
    borderRadius: 20,
  },
  hintText: {
    fontSize: 14,
    color: '#14B8A6',
    fontWeight: '500',
  },
});