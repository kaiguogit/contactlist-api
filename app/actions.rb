# Homepage (Root path)
get '/' do
  erb :index
end

post '/contacts' do
  contact = Contact.new(params)
  if contact.save
    json contact
  else
  end
end

get '/contacts' do
  if params[:keyword]
    json Contact.where("name like :keyword OR email like :keyword COLLATE NOCASE", keyword: "%#{params[:keyword]}%")
  else
    json Contact.all
  end
end

get '/contacts/:id' do

end

helpers do

  def format_date(date)
    date.strftime("%m/%d/%Y")
  end
end