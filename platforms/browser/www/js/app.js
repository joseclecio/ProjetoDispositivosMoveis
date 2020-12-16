// App Controller
const App = ((ItemCtrl, StorageCtrl, UICtrl)  => {

    // get ID's and CLASSES of elements in the DOM
    const loadEventListeners = () => {
        
        const UISelectors = UICtrl.getSelectors();
        
        // add item click event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        // disable enter key for submit
        document.addEventListener('keypress', (e) => {
            if(e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        });

        // edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

         // update item submit
         document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

         // delete item submit
         document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        // back item clear inputs
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

        // edit icon click event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
        
    }

    // add an item submit to ui and data structure
    const itemAddSubmit = (e) => {

       const input = UICtrl.getItemInput();

       if(input.name !== '' && input.calories !== '') {
        // add item to data structure
        const newItem = ItemCtrl.addItem(input.name, input.calories);
        // add item to UI
        UICtrl.addListItem(newItem);

        const totalCalories = ItemCtrl.getTotalCalories();
        
        UICtrl.showTotalCalories(totalCalories);

        StorageCtrl.storeItem(newItem);

        UICtrl.clearEditState();

        // clear input fields
        UICtrl.clearInput();
       }

        e.preventDefault();
    }
    // delete item from data structure and UI
    itemDeleteSubmit = (e) => {

        // get current item
        const currentItem = ItemCtrl.getCurrentItem();

        // delete from data structure
        ItemCtrl.deleteItem(currentItem.id);

        UICtrl.deleteListItem(currentItem.id);

        StorageCtrl.removeItemFromStorage(currentItem.id)

        e.preventDefault();
    }

    // click edit item
    const itemEditClick = (e) => {
        if(e.target.classList.contains('edit-item')) {

            const listId = e.target.parentNode.parentNode.id;

            // break into an array (split item-0 into just 0 (or relevant number))
            const listIdArr = listId.split('-');
            // get the actual ID
            const id = parseInt(listIdArr[1]);
            // get the item
            const itemToEdit = ItemCtrl.getItemById(id);
            // set current item
            ItemCtrl.setCurrentItem(itemToEdit);
            // nothing to pass as item we want ot edit is stored in currentItem
            UICtrl.addItemToForm();
            
        }
        e.preventDefault();
    }

    const itemUpdateSubmit = (e) => {

        const item = UICtrl.getItemInput();

        const updatedItem = ItemCtrl.updateItem(item.name, item.calories);    
        
        UICtrl.updateListItem(updatedItem);
        
        const totalCalories = ItemCtrl.getTotalCalories();
        
        UICtrl.showTotalCalories(totalCalories);

        // update local storage
        StorageCtrl.updateItemStorage(updatedItem);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    const clearAllItemsClick = (e) => {

        // delte all data from structure
        ItemCtrl.clearAllItems();

        // remove list items from UI
        UICtrl.removeItems();

        // remove all items from ls
        StorageCtrl.removeAllItemsFromStorage();

        e.preventDefault();
    }
    
    // Public method
    return {
        init: function() {

        // clear edit state / set initial state
        UICtrl.clearEditState();

         // Fetch items from data structure   
        const items = ItemCtrl.getItems();

        if(items.length === 0) {
            UICtrl.hideList();
        } else {
            // Populate list with Items
            UICtrl.populateItemList(items);
        }

        const totalCalories = ItemCtrl.getTotalCalories();
        
        UICtrl.showTotalCalories(totalCalories);

        // load event listeners
        loadEventListeners();
        }
    }

})(ItemCtrl, StorageCtrl, UICtrl); 

App.init();
