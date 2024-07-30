let obj={
    name: "john",
    say(){
        console.log("hello"+this.name);
    },
};

const say=obj.say;
say(); // hello undefinded
obj.say(); // hello john

let obj2={
    name: "john",
    say : ()=>{
        console.log("hello"+this.name); //전역객체 가져옴
    },
};

obj2.say(); // hello undefinded
// this 전역객체 가져옴 