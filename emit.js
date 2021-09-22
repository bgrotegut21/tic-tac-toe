let emit = (
    function (){
        let events = {};

        function subscribe(name,func){
            if(events[name]) events[name].push(func);
            else {
                events[name] = [];
                events[name].push(func);
            }
        }

        function fireEvents(name,data){
            console.log(events[name]);
            if(events[name]){
                events[name].forEach(cryOut => {
                    console.log(cryOut);
                    cryOut(data)
                })
            }
        }
        function unsubsribe(name,func){
            if (events[name]){
                let temporaryArray = events[name];
                let filteredArray = temporaryArray.filter(currentFunction => currentFunction != func);
                events[name] = filteredArray;
            }
        }
        return {subscribe, unsubsribe, fireEvents};
    }
)();