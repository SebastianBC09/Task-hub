# 📌 Todo Task List

## 📖 Descripción

Una aplicación de gestión de tareas desarrollada con **React, TypeScript y Zustand**, que permite organizar tareas con prioridades y subtareas. Se han aplicado patrones de diseño como **Strategy** para el filtrado de tareas y **Composite** para la gestión de subtareas, asegurando un código modular y reutilizable.

---

## 🚀 Tecnologías Usadas

- **React** (Vite + TypeScript)
- **Zustand** (Gestión de estado)
- **Axios** (Consumo de API)
- **TanStack Query** (Gestión de datos remotos)
- **Framer Motion** (Animaciones)
- **Tailwind CSS** (Estilización)

---

## 🛠️ Funcionalidades

✔ **Agregar tareas** con prioridad (Alta, Media, Baja).\
✔ **Marcar tareas como completadas**.\
✔ **Eliminar tareas**.\
✔ **Filtrar tareas** por prioridad y estado (Pendientes/Completadas).\
✔ **Agrupar tareas y subtareas** (Patrón Composite).\
✔ **Persistencia de tareas** con Zustand y React Query.\
✔ **Interfaz animada** con Framer Motion.

---

## 🏗️ Arquitectura del Proyecto

```plaintext
src/
├── api/               # Servicios API con Axios
│   ├── client.ts      # Cliente Axios configurado
│   ├── services/      # Endpoints organizados por funcionalidad
│   │   ├── createTask.ts
│   │   ├── deleteTask.ts
│   │   ├── getTasks.ts
│   │   ├── updateTask.ts
│
├── components/        # Componentes UI reutilizables
│   ├── PriorityBadge.tsx
│   ├── TaskForm.tsx
│   ├── TaskItem.tsx
│   ├── TaskList.tsx
│
├── hooks/             # Hooks personalizados
│   ├── useCreateTask.ts
│   ├── useDeleteTask.ts
│   ├── useTasks.ts
│   ├── useUpdateTask.ts
│
├── pages/             # Páginas principales
│   ├── TaskHub.tsx    # Página principal con lista de tareas
│
├── store/             # Gestión de estado con Zustand
│   ├── taskStore.ts
│
├── types/             # Tipos y patrones de diseño
│   ├── strategies/    # Patrón Strategy (Filtrado de tareas)
│   │   ├── filterStrategies.ts
│   ├── composite/     # Patrón Composite (Gestión de subtareas)
│   │   ├── taskComposite.ts
│   ├── task.ts        # Definiciones de tipos de tareas
│
└── App.tsx            # Punto de entrada de la app
```

---

## 🎯 Patrones de Diseño Aplicados

### 🏁 **Strategy (Filtrado de Tareas)**

Se implementó el patrón **Strategy** para permitir la selección dinámica de diferentes estrategias de filtrado sin modificar la estructura del código base.

```typescript
export interface FilterStrategy {
  filter(tasks: Task[]): Task[];
}

export class PriorityFilterStrategy implements FilterStrategy {
  constructor(private priority: Priority) {}
  filter(tasks: Task[]): Task[] {
    return tasks.filter(task => task.priority === this.priority);
  }
}
```

### 🌳 **Composite (Gestión de Subtareas)**

El patrón **Composite** permite modelar la relación jerárquica entre tareas principales y subtareas, facilitando la organización y manipulación estructurada de datos.

```typescript
export class TaskComposite {
  private subtasks: TaskComposite[] = [];
  constructor(public id: number, public title: string) {}
  addSubtask(task: TaskComposite) { this.subtasks.push(task); }
  getSubtasks(): TaskComposite[] { return this.subtasks; }
}
```

---

## 📦 Instalación y Uso

### 🔧 **1. Clonar el repositorio**

```sh
git clone https://github.com/usuario/todo-task-list.git
cd todo-task-list
```

### 📦 **2. Instalar dependencias**

```sh
npm install
```

### 🚀 **3. Ejecutar en modo desarrollo**

```sh
npm run dev
```

---

## 📜 Licencia

Este proyecto está bajo la **MIT License**.
