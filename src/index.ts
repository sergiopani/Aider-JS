import { User } from "./models/User";

const user = new User({name:'NEW record', age: 0});



user.events.on('change', () => {
  console.log("Change!")
})

user.events.trigger('change')

