class UsersController < ApplicationController
  before_action :authenticate_user!
  
  #GET Request for all Users
  def index
    @users = User.includes(:profile)
  end
  
  #GET Request for /users/[id]
  def show
    @user = User.find(params[:id])
  end
  
  
end