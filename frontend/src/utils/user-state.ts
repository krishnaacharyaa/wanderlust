class UserState {
  private static instance: UserState;
  private user!: string | null;

  constructor() {
    if (!UserState.instance) {
      this.user = null;
      UserState.instance = this;
    }
    return UserState.instance;
  }

  setUser(user: string | null): void {
    this.user = user;
  }

  getUser(): string | null {
    return this.user;
  }
}

const userState = new UserState();

export default userState;
