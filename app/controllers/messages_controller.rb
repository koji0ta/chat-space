class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end


  def create
    @message = @group.messages.new(message_params)
    if @message.save  # messageが保存されたら、即JSON形式で返す。これがないと、ふつうの通信になっちゃう
      respond_to do |format|
        format.json
      end
      
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private
  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end
  
  def set_group
    @group = Group.find(params[:group_id])
  end

end
