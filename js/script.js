function loadMenu(url, elementId) {
    $.getJSON(url, function(data) {
        const menuElement = $('#' + elementId);
        if (menuElement.length) {
            menuElement.empty();
            if (Array.isArray(data)) {
                data.forEach(entry => {
                    if (entry.hasOwnProperty('title') && Array.isArray(entry.items)) {
                        // Handle nested structure
                        const categoryDiv = $('<div>').addClass('menu-category');
                        const categoryTitle = $('<h3>').addClass('menu-category-title').text(entry.title);
                        const itemsList = $('<ul>').addClass('menu-items-list');

                        entry.items.forEach(item => {
                            const listItem = $('<li>').addClass('menu-item');
                            listItem.html(`<span>${item.name}</span><span>${item.price}</span>`);
                            itemsList.append(listItem);
                        });

                        categoryDiv.append(categoryTitle);
                        categoryDiv.append(itemsList);
                        menuElement.append(categoryDiv);
                    } else if (entry.hasOwnProperty('name') && entry.hasOwnProperty('price')) {
                        // Handle flat structure
                        const listItem = $('<div>').addClass('menu-item');
                        listItem.html(`<span>${entry.name}</span><span>${entry.price}</span>`);
                        menuElement.append(listItem);
                    } else {
                        console.error('Invalid menu entry format:', entry);
                    }
                });
            } else {
                console.error('Data is not an array.');
            }
        } else {
            console.error(`Element with ID ${elementId} not found.`);
        }
    }).fail(function(jqxhr, textStatus, error) {
        const err = textStatus + ", " + error;
        console.error('Error loading menu:', err);
    });
}

$(document).ready(function() {
    // Load the breakfast menu by default
    loadMenu('./menu-json/main-course-breakfast.json', 'main-course-menu');
    loadMenu('./menu-json/short-eates.json', 'short-eats-menu');
    loadMenu('./menu-json/beverages.json', 'beverages-menu');

    $('#option1').click(function() {
        if (this.checked) {
            loadMenu('./menu-json/main-course-breakfast.json', 'main-course-menu');
        }
    });

    $('#option2').click(function() {
        if (this.checked) {
            loadMenu('./menu-json/main-course-lunch.json', 'main-course-menu');
        }
    });
});
