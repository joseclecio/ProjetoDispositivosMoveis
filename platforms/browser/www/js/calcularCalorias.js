(function () {
            
    var i = 0, j = 0, option;
    
    
    /* Populate the first page selectors */
    //IDADE
    for (i = 15; i <= 90; i++) {
        option = document.createElement("option");
        option.text = i;
        document.getElementById("age_select").appendChild(option);
    }
    
    //KG
    for (i = 31; i <= 120; i++) {
        option = document.createElement("option");
        option.text = i;
        document.getElementById("weight_select").appendChild(option);
    }
    
    //CM
    for (i = 121; i <= 210; i++) {
        option = document.createElement("option");
        option.text = i;
        document.getElementById("height_select").appendChild(option);
    }
    
    
    /* Adding necessary event listeners */
    addListener(document.getElementById("proceed"), 'click', function() {
        proceed();
    });
    addListener(document.getElementById("back"), 'click', function() {
        back();
    });
    addListener(document.getElementById("start_over"), 'click', function() {
        start_over();
    });
    
    var activity_selectors = document.getElementsByClassName("activity_selector");
    
    for(i = 0, j = activity_selectors.length; i < j; i++) {
        /* Closure function that allows to track which element was clicked */ 
        (function(index){
            addListener(activity_selectors[i], 'click', function() {
                activity_select(index);
            });
        })(i);
    }
    
    /* Main app logic */
    
    var screen_number = 1;
    var gender, 
        age, 
        weight, 
        height, 
        activity_factor,
        BMR,
        daily_need;
    
    function proceed() {
        document.getElementById("form01").style.display = "none";
        document.getElementById("form02").style.display = "block";
        document.getElementById("proceed").style.display = "none";
        document.getElementById("back").style.display = "block";
        screen_number = 2;
    }
    function back() {
        switch(screen_number) {
            case 2:
                document.getElementById("form01").style.display = "block";
                document.getElementById("form02").style.display = "none";
                document.getElementById("proceed").style.display = "block";
                document.getElementById("back").style.display = "none";
                screen_number = 1;
            break;
                
            case 3:
                document.getElementById("form02").style.display = "block";
                document.getElementById("result_wrapper").style.display = "none";
                document.getElementById("start_over").style.display = "none";
                screen_number = 2;
            break;

        }                
    }
    
    function activity_select(index) {
        document.getElementById("form02").style.display = "none";
        document.getElementById("result_wrapper").style.display = "block";
        document.getElementById("start_over").style.display = "block";
        screen_number = 3;
        
        /* Collecting input values */

        if(document.getElementById('male').checked) {
            gender = 0; // male
        }else if(document.getElementById('female').checked) {
            gender = 1; // female
        }  
        
        var selected_age = document.getElementById("age_select");
        age = selected_age.options[selected_age.selectedIndex].text;
        
        var selected_weight = document.getElementById("weight_select");
        weight = selected_weight.options[selected_weight.selectedIndex].text;
        
        var selected_height = document.getElementById("height_select");
        height = selected_height.options[selected_height.selectedIndex].text;
        
        switch(index) {
            case 0: activity_factor = 1.2;      break;
            case 1: activity_factor = 1.375;    break;
            case 2: activity_factor = 1.55;     break;
            case 3: activity_factor = 1.725;    break;
            case 4: activity_factor = 1.9;      break;
        }
        
        if(gender === 0) {
            BMR = 66 + ( 13.7 * weight ) + ( 5 * height ) - ( 6.8 * age );
        } else if (gender === 1) {
            BMR = 655 + ( 9.6 * weight ) + ( 1.8 * height ) - ( 4.7 * age );
        }
        
        daily_need = BMR * activity_factor;

        document.getElementById("score").innerHTML = Math.round(daily_need) + " cal";
    }
    function start_over() {
        document.getElementById("form01").style.display = "block";
        document.getElementById("result_wrapper").style.display = "none";
        document.getElementById("start_over").style.display = "none";
        document.getElementById("proceed").style.display = "block";
        document.getElementById("back").style.display = "none";
        screen_number = 1;
        
        /* Reset selected values */
        document.getElementById("male").checked = true;
        document.getElementById("age_select").value = "value1";
        document.getElementById("weight_select").value = "value1";
        document.getElementById("height_select").value = "value1";
    }
    
    /**
     * Utility to wrap the different behaviors between W3C-compliant browsers
     * and IE when adding event handlers.
    **/

    function addListener(element, type, callback) {
     if (element.addEventListener) element.addEventListener(type, callback);
     else if (element.attachEvent) element.attachEvent('on' + type, callback);
    }
})();     