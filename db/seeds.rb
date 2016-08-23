10.times do 
  name = Faker::Name.name
  email = Faker::Internet.email
  Contact.create(name: name, email: email)
end