class UsersController < Sinatra::Base
  include Endpoint

  post '/authenticate' do
    user = User.where(name: params[:user][:name]).first
    halt 401, jbuilder(%(json.error 'wrong username or password')) unless user.present?
    halt 401, jbuilder(%(json.error 'wrong username or password')) unless user.authenticate(params[:user][:password])

    token = Rack::JWT::Token.encode({ sub: user.id.to_s }, Settings[:session][:secret])
    halt 201, jbuilder(%(json.token '#{token}'))
  end
end
