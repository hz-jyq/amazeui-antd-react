# Define constants
RACK_ENV = ENV['RACK_ENV'] ||= 'development' unless defined?(RACK_ENV)
ALIEZ_ROOT = File.expand_path('../..', __FILE__) unless defined?(ALIEZ_ROOT)

# Load dependencies
require 'rubygems'
require 'bundler/setup'
Bundler.require(:default, RACK_ENV)

# Global settings
Sinatra::Base.set(:environment, RACK_ENV.to_sym)
Sinatra::Base.set(:views, File.join(ALIEZ_ROOT, 'app', 'views'))

# Read configuration files
file = File.join(ALIEZ_ROOT, 'config', "#{Sinatra::Base.environment}.toml")
Settings = ActiveSupport::HashWithIndifferentAccess.new(TOML.parse(ERB.new(File.read(file)).result))

# Configure Mongoid
Mongoid.load_configuration(Settings[:Mongoid])
Mongoid.logger.level = Logger::DEBUG if Sinatra::Base.development?
Mongo::Logger.logger.level = Logger::DEBUG if Sinatra::Base.development?

# Initialize app
Dir["#{ALIEZ_ROOT}/config/initializers/*rb"].each { |f| require f }
require File.join(ALIEZ_ROOT, 'app', 'app')
