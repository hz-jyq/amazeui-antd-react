module Endpoint
  extend ActiveSupport::Concern

  included do
    set(:prefix_uri) { "/#{name.underscore.sub(/_controller$/, '')}" }
  end
end
