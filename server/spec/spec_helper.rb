RACK_ENV = 'test'.freeze
require_relative '../config/boot'

RSpec.configure do |config|
  config.include Mongoid::Matchers, type: :model
end
