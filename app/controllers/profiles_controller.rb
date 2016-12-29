class ProfilesController < ApplicationController
  # Create new profile
  def new    
    #Render blank profile details form
    @profile = Profile.new
  end
end