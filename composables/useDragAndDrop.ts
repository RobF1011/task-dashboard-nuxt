export function useDragAndDrop<T extends { id: number; status: string }>(
  items: T[]
) {
  const draggedItemId = ref<number | null>(null);

  function onDragStart(itemId: number) {
    draggedItemId.value = itemId;
  }

  function onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  function onDrop(newStatus: string) {
    if (draggedItemId.value !== null) {
      const item = items.find((i) => i.id === draggedItemId.value);

      if (item && item.status !== newStatus) {
        item.status = newStatus;
      }

      draggedItemId.value = null;
    }
  }

  return {
    draggedItemId,
    onDragStart,
    onDragOver,
    onDrop,
  };
}