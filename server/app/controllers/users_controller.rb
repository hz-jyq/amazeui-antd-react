class UsersController < Sinatra::Base
  include Endpoint

  post '/authenticate' do
    user = User.where(name: params[:user][:name]).first
    halt 401, jbuilder(%(json.error 'wrong username or password')) unless user.present?
    halt 401, jbuilder(%(json.error 'wrong username or password')) unless user.authenticate(params[:user][:password])

    token = Rack::JWT::Token.encode({ sub: user.id }, Settings[:session][:secret])
    halt 201, jbuilder(%(json.token '#{token}'))
  end

  post '/reauthenticate' do
    token = Rack::JWT::Token.encode({ sub: current_user.id }, Settings[:session][:secret])
    halt 201, jbuilder(%(json.token '#{token}'))
  end

  get '/' do
    halt 200, jbuilder(%(json.array! User.all, :id, :name))
  end
end
