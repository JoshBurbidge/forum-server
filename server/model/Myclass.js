
class Super {
    constructor(first, last) {
        this.firstname = first;
        this.lastname = last;
    }

    get fullname() {
        return this.firstname + " " + this.lastname;
    }
    set fullname(s) {
        this.firstname = s.split(" ")[0];
        this.lastname = s.split(" ")[1];
    }
    say = () => {
        console.log('hello');
    }
}

class Myclass extends Super {
    constructor(first, last) {
        super(first, last);
    }




    change = (newname) => {
        this.firstname = newname;
    }
}

obj = new Myclass("abc", "def");
console.log(Object.getPrototypeOf(obj));
obj.change('hello');
obj.firstname = 'firstname';
obj.fullname = "first last";
console.log(obj);