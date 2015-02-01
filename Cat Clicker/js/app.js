(function(){
    var model = {
        cats: [],
        currentCat: null,

        init: function() {
            var Cat = function(name) {
                this.name = name;
                this.pic = name + '.jpg';
                this.count = 0;
            };

            for (var i = 1; i <= 5; i++) {
                var cat = new Cat('cat' + i);
                this.cats.push(cat);
            }

            this.currentCat = this.cats[0];
        },

        getCurrentCat: function() {
            return this.currentCat;
        },

        setCurrentCat: function(index) {
            this.currentCat = this.cats[index - 1];
        },

        getAllCats: function() {
            return this.cats;
        },

        updateCat: function() {
            this.currentCat.count += 1;
        },

        totalCats: function() {
            return this.cats.length;
        }
    };


    var octopus = {
        adminMode: false,

        init: function() {
            model.init();
            catListView.init();
            catDisplayView.init();
            adminView.init();
        },

        getCurrentCat: function() {
            return model.getCurrentCat();
        },

        setCurrentCat: function(index) {
            model.setCurrentCat(index);
        },

        getCats: function() {
            return model.getAllCats();
        },

        updateCat: function() {
            model.updateCat();
        },

        totalCats: function() {
            return model.totalCats();
        },

        getAdminStatus: function() {
            return this.adminMode;
        },

        setAdminStatus: function(val) {
            this.adminMode = val;
        }
    };


    var catListView = {
        init: function() {
            var catList = document.getElementById('cats');
            var length = octopus.totalCats();
            for (var i = 1; i <= length; i++) {
                var li = document.createElement('li');
                li.id = 'cat' + i;
                li.innerHTML = 'cat' + i;

                li.addEventListener('click', (function(index) {
                    return function() {
                        octopus.setCurrentCat(index);
                        var cat = octopus.getCurrentCat();
                        catDisplayView.render(cat);
                    };
                })(i), false);

                catList.appendChild(li);
            }
        }
    };


    var catDisplayView = {
        catName: document.getElementById('name'),
        catPic: document.getElementById('pic'),
        clickCount: document.getElementById('count'),

        init: function() {
            var clickCount = this.clickCount;           // this step is needed due to the closure and it's scope? (see comment below)
            this.catPic.addEventListener('click', function() {
                var cat = octopus.getCurrentCat();
                octopus.updateCat();
                clickCount.innerHTML = cat.count;       // if you were to use 'this.clickCount' without the line above w/the comment, this would be undefined
            });

            catDisplayView.render(octopus.getCurrentCat());
        },

        render: function(cat) {
            this.catName.innerHTML = cat.name;
            this.catPic.src = 'img/' + cat.pic;
            this.clickCount.innerHTML = cat.count;
        }
    };


    var adminView = {
        adminForm: document.getElementById('admin-form'),
        newName: document.getElementById('new-name'),
        newPic: document.getElementById('new-url'),
        newClickCount: document.getElementById('new-clicks'),
        adminButton: document.getElementById('admin'),
        saveButton: document.getElementById('save'),
        cancelButton: document.getElementById('cancel'),

        init: function() {
            var newName = this.newName,
                newPic = this.newPic,
                newClickCount = this.newClickCount;
            
            this.adminButton.addEventListener('click', function() {
                octopus.setAdminStatus(true);
                adminView.render();
            });

            this.saveButton.addEventListener('click', function() {
                var cat = octopus.getCurrentCat();console.log(newName)
                // should this be separated from the View?
                cat.name = newName.value;
                cat.pic = newPic.value;
                cat.count = newClickCount.value;
                octopus.setAdminStatus(false);
                adminView.render();
                catDisplayView.render(cat);
            });

            this.cancelButton.addEventListener('click', function() {
                octopus.setAdminStatus(false);
                adminView.render();
            });

            adminView.render();
        },

        render: function() {
            if (octopus.getAdminStatus()) {
                this.adminForm.style.display = 'block';
            } else {
                this.adminForm.style.display = 'none';
            }
        }
    };

    octopus.init();
})();