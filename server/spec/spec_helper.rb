RACK_ENV = 'test'.freeze
require_relative '../config/boot'

module RSpecControllerHelper
  def app
    App.new
  end

  def authorize(user)
    token = Rack::JWT::Token.encode({ sub: user.id }, Settings[:session][:secret])
    header('Authorization', "Bearer #{token}")
  end

  def response_status
    last_response.status
  end

  def response_body_as_json
    JSON.parse(last_response.body)
  end
end

RSpec.configure do |config|
  config.include Mongoid::Matchers, type: :model
  config.include Rack::Test::Methods, type: :controller
  config.include RSpecControllerHelper, type: :controller

  config.include FactoryGirl::Syntax::Methods
  config.before(:suite) do
    FactoryGirl.find_definitions
  end

  DatabaseCleaner.orm = :mongoid
  DatabaseCleaner.strategy = :truncation
  config.before(:each) do
    DatabaseCleaner.clean
  end
end
