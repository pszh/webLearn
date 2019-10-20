// react 的事物，在函数执行前执行一个事情，执行后在执行模式

// setState 事务 setState 是同步还是异步

function perform ( cb, arr){
    return ()=>{
        arr.forEach(wrapper => {
            wrapper.initialize();
        });
        cb();
        arr.forEach(wrapper=>{
            wrapper.close();
        })
    }
}


const newFunc = perform(function(){
        console.log('普通函数， 核心功能')
    },[ 
        { //wrapper1
            initialize(){
                console.log('wrapper1 start')
            },
            close(){
                console.log('wrapper1 close')
            }
        },
        { //wrapper2
            initialize(){
                console.log('wrapper2 start')
            },
            close(){
                console.log('wrapper2 close')
            }
        },
    ])

    newFunc();