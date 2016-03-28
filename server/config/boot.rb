# Define constants
RACK_ENV = ENV['RACK_ENV'] ||= 'development' unless defined?(RACK_ENV)
ALIEZ_ROOT = File.expand_path('../..', __FILE__) unless defined?(ALIEZ_ROOT)

# Load dependencies
require 'bundler/setup'
Bundler.require(:default, RACK_ENV)

# Load configurations
require File.join(ALIEZ_ROOT, 'config', 'database')

# Load app
require File.join(ALIEZ_ROOT, 'app', 'app')
