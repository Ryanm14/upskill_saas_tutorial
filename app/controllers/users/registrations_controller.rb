class Users::RegistrationsController < Devise::RegistrationsController
  # Extend Devise gem so users sign up with Pro account save with a special Stripe subscription function or 
  # sign up with usual
    def create
      super do |resource|
        if params[:plan]
          resource.plan_id = params[:plan]
          if resource.plan_id == 2
            resource.save_with_subscription
          else
            resource.save
          end
      end
    end
  end
end