import { User } from "./models/User";

const user = User.buildUser({ id: 1 });

//console.log(user.get('name'))
user.on('change', () => {
    console.log(user);
});

user.fetch()


