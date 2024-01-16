function skillsMember(){
    var member = {
        name: "John",
        age: 30,
        skills: ["Javascript", "HTML", "CSS"],
        address: {
            street: "123 main st",
            city: "Boston",
            state: "MA"
        },
        getBirthYear: function(){
            return 2017 - this.age;
        }
    }
    return member;

}