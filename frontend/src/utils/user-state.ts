class UserState {
  private static instance: UserState;
  private user: { _id: string; role: string } | null;

  private constructor() {
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('role');

    if (userId && userRole) {
      this.user = { _id: userId, role: userRole };
    } else {
      this.user = null;
    }
  }

  static getInstance(): UserState {
    if (!UserState.instance) {
      UserState.instance = new UserState();
    }
    return UserState.instance;
  }

  setUser(user: { _id: string; role: string } | null): void {
    this.user = user;
    if (user) {
      localStorage.setItem('userId', user._id);
      localStorage.setItem('role', user.role);
    } else {
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
    }
  }

  getUser(): { _id: string; role: string } | null {
    return this.user;
  }

  removeUser(): void {
    this.setUser(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
  }
}

const userState = UserState.getInstance();
export default userState;
