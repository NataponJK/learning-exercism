//
// This is only a SKELETON file for the 'Rest API' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class RestAPI {
  constructor(db = { users: {} }) {
    this.db = db;
  }

  get(url) {
    const [path, queryString] = url.split('?');

    if (path === '/users') {
      if (!queryString) {
        return { users: [...this.db.users].sort((a, b) => a.name.localeCompare(b.name)) };
      }

      const params = new URLSearchParams(queryString);
      const targetUsers = params.get('users')?.split(',') || [];

      const filteredUsers = this.db.users.filter(user => targetUsers.includes(user.name))
                                         .sort((a, b) => a.name.localeCompare(b.name));
      return { users: filteredUsers };
    }
  }

  post(url, payload) {
    if (url === '/add') {
      const newUser = {
        name: payload.user,
        owes: {},
        owed_by: {},
        balance: 0
      };
      this.db.users.push(newUser);
      return newUser;
    }

    if (url === '/iou') {
      const { lender, borrower, amount } = payload;

      const lenderUser = this.db.users.find(u => u.name === lender);
      const borrowerUser = this.db.users.find(u => u.name === borrower);

      if (lenderUser && borrowerUser) {
        this.updateIOU(lenderUser, borrowerUser, amount);
      }

      return {
        users: [lenderUser, borrowerUser].sort((a, b) => a.name.localeCompare(b.name))
      };
    }
  }

  updateIOU(lender, borrower, amount) {
    if (borrower.owed_by[lender.name]) {
      borrower.owed_by[lender.name] -= amount;
      if (borrower.owed_by[lender.name] === 0) delete borrower.owed_by[lender.name];

      if (borrower.owed_by[lender.name] < 0) {
        borrower.owes[lender.name] = Math.abs(borrower.owed_by[lender.name]);
        delete borrower.owed_by[lender.name];
      }
    } else {
      borrower.owes[lender.name] = (borrower.owes[lender.name] || 0) + amount;
    }

    if (lender.owes[borrower.name]) {
      lender.owes[borrower.name] -= amount;
      if (lender.owes[borrower.name] === 0) delete lender.owes[borrower.name];

      if (lender.owes[borrower.name] < 0) {
        lender.owed_by[borrower.name] = Math.abs(lender.owes[borrower.name]);
        delete lender.owes[borrower.name];
      }
    } else {
      lender.owed_by[borrower.name] = (lender.owed_by[borrower.name] || 0) + amount;
    }
    this.recalculateBalance(lender);
    this.recalculateBalance(borrower);
  }

  recalculateBalance(user) {
    const totalOwedByOthers = Object.values(user.owed_by).reduce((sum, val) => sum + val, 0);
    const totalOwedToOthers = Object.values(user.owes).reduce((sum, val) => sum + val, 0);
    user.balance = totalOwedByOthers - totalOwedToOthers;
  }
}
