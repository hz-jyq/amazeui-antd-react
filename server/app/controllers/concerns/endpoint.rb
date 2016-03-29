module Endpoint
  extend ActiveSupport::Concern

  included do
    set(:prefix_uri) { "/#{name.underscore.sub(/_controller$/, '')}" }

    helpers do
      def indifferent_params(params)
        ActiveSupport::HashWithIndifferentAccess.new(params)
      end
    end
  end
end
