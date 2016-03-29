class UsersController < Sinatra::Base
  include Endpoint

  post '/authenticate' do
    user = User.find_by(name: params[:user][:name])
    if user.authenticate(params[:user][:password])
      Rack::JWT::Token.encode({ sub: user.id }, Settings[:session][:secret])
    end
  end
end
