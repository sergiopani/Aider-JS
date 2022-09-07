import { User } from "./models/User";

const user = new User({ name: 'NEW record', age: 0 });

//console.log(user.get('name'))


user.on('change', () => {
    console.log("its working");
});

user.trigger('change');