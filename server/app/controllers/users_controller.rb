class UsersController < Sinatra::Base
  include Endpoint

  post '/authenticate' do
    user = User.where(name: params[:user][:name]).first
    halt 401, jbuilder(%(json.error 'wrong username or password')) unless user.present?
    halt 401, jbuilder(%(json.error 'wrong username or password')) unless user.authenticate(params[:user][:password])

    token = Rack::JWT::Token.encode({ sub: user.id }, Settings[:session][:secret])

    r = jbuilder <<-EOT, locals: { user: user }
      json.accessToken '#{token}'
      json.user user, :name
    EOT
    halt 201, r
  end

  post '/re-authenticate' do
    token = Rack::JWT::Token.encode({ sub: current_user.id }, Settings[:session][:secret])

    r = jbuilder <<-EOT, locals: { user: current_user }
      json.accessToken '#{token}'
      json.user user, :name
    EOT
    halt 201, r
  end

  get '/' do
    halt 200, jbuilder(%(json.array! User.all, :id, :name))
  end
end
