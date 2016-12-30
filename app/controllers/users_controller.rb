class UsersController < ApplicationController
  before_action :authenticate_user!
  
  #GET Request for /users/[id]
  def show
    @user = User.find(params[:id])
  end
end