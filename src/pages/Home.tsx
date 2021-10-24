import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    } as Task;

    setTasks(oldState => [...oldState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const updatedTask = updatedTasks.find(task => task.id === id);

    if (updatedTask) {
      const newTaskList = tasks.filter(tasks => tasks.id != id);

      updatedTask.done = !updatedTask.done;

      newTaskList.push(updatedTask);

      setTasks(newTaskList);
    }
  }

  function handleRemoveTask(id: number) {
    const newTaskList = tasks.filter(tasks => tasks.id != id);

    setTasks(newTaskList);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
});
