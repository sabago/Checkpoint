// functinos from beautiful drag and drop's examples plus some own dispatching code

// function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


// Moves an item from one list to another list.
export const move = (source, destination, droppableSource, droppableDestination, dispatchObj) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);

  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  // Calling dispatch functions to first remove from original list
  // then to add to the new list
  const removeDispatchFunction = dispatchObj.remove[droppableSource.droppableId];
  removeDispatchFunction(removed);

  const addDispatchFunction = dispatchObj.add[droppableDestination.droppableId];
  addDispatchFunction(removed);
  
  return result;
};
