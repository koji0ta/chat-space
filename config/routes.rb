Rails.application.routes.draw do
  devise_for :users
  root to: "groups#index"
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:index, :create, :new, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
end
