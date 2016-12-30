class ProfilesController < ApplicationController
  # Create new profile GET Request
  def new    
    #Render blank profile details form
    @profile = Profile.new
  end
  
  #POST Request
  def create
    # Ensure that we have the user who is filling out form
    @user = User.find( params[:user_id] )
    # Create profile linked to this specific user
    @profile = @user.build_profile( profile_params )
    if @profile.save
      flash[:success] = "Profile updated!"
      redirect_to user_path(id: params[:user_id])
    else
      render action: :new
    end
  end
  
  #GET Request for edit profile
  def edit
    @user = User.find( params[:user_id] )
    # Create profile linked to this specific user
    @profile = @user.profile
  end
  
  #PUT Request for edited profiles
  def update
   @user = User.find( params[:user_id] )
   @profile = @user.profile
   if @profile.update_attributes(profile_params)
      flash[:success] = "Profile updated!"
      redirect_to user_path(id: params[:user_id])
    else
      render action: :edit
  end
end
  
  private
    def profile_params
      params.require(:profile).permit(:first_nsame, :last_name, :avatar, :job_title, :phone_number, :contact_email, :description)
    end
end