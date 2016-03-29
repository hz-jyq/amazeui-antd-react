# Define constants
RACK_ENV = ENV['RACK_ENV'] ||= 'development' unless defined?(RACK_ENV)
ALIEZ_ROOT = File.expand_path('../..', __FILE__) unless defined?(ALIEZ_ROOT)

# Load dependencies
require 'rubygems'
require 'bundler/setup'
Bundler.require(:default, RACK_ENV)

# Load configurations
f = File.join(ALIEZ_ROOT, 'config', "#{Sinatra::Base.environment}.toml")
Settings = ActiveSupport::HashWithIndifferentAccess.new(TOML.parse(ERB.new(File.read(f)).result))

# Configure Mongoid
Mongoid.load_configuration(Settings[:Mongoid])

# Initialize app
require File.join(ALIEZ_ROOT, 'app', 'app')
