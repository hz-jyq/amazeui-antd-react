RACK_ENV = 'test'.freeze
require_relative '../config/boot'

RSpec.configure do |config|
  config.include Mongoid::Matchers, type: :model
  config.include Rack::Test::Methods, type: :controller
  config.include FactoryGirl::Syntax::Methods

  DatabaseCleaner.orm = :mongoid
  DatabaseCleaner.strategy = :truncation
  config.before(:each) do
    DatabaseCleaner.clean
  end
end
