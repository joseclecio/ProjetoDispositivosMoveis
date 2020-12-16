// Storage Controller 
const StorageCtrl = (() => {
    return {
        storeItem: (item) => {
            let items

            if(localStorage.getItem('items') === null) {
                items = [];
                // push item to array and store to ls
                items.push(item);
                
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                // get items from ls
                // convert to object, push new item to object
                // set object back to ls
                items = JSON.parse(localStorage.getItem('items'));

                items.push(item);

                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemsFromLocalStorage: () => {
            let items;
            if(localStorage.getItem('items') === null) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updateItemStorage: (updatedItem) => {
            let items = JSON.parse(localStorage.getItem('items'));
            // loop through items from ls
            // check if the updated item id matches item id within items from ls
            // find index of item in ls, remove it and replace with updated item
            items.forEach((item, index) => {
                if(updatedItem.id === item.id) {
                    items.splice(index, 1, updatedItem)
                }
            })
            localStorage.setItem('items', JSON.stringify(items));
        },
        removeItemFromStorage: (id) => {
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach(function(item, index) {
                if(id === item.id) {
                    items.splice(index, 1);
                }
            })
            localStorage.setItem('items', JSON.stringify(items));
        },
        removeAllItemsFromStorage: function() {
            localStorage.clear('items');
        }
    }
})();
