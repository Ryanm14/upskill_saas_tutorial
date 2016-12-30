class UsersController < ApplicationController
  #GET Request for /users/[id]
  def show
    @user = User.find(params[:id])
  end
end