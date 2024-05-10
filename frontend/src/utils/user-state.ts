class UserState {
  private static instance: UserState;
  private user!: {} | null;

  constructor() {
    if (!UserState.instance) {
      this.user = null;
      UserState.instance = this;
    }
    return UserState.instance;
  }

  setUser(user: {} | null): void {
    this.user = user;
  }

  getUser(): {} | null {
    return this.user;
  }
}

const userState = new UserState();

export default userState;
