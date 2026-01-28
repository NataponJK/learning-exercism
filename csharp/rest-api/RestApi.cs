using System.Text.Json.Serialization;

using Newtonsoft.Json;
public class User
{
    [JsonProperty("name")]
    public string Name { get; set; }
    [JsonProperty("owes")]
    public SortedDictionary<string, int> Owes { get; set; } = [];
    [JsonProperty("owed_by")]
    public SortedDictionary<string, int> OwedBy { get; set; } = [];
    [JsonProperty("balance")]
    public int Balance
    {
        get
        {
            int balance = 0;
            foreach (KeyValuePair<string, int> item in Owes)
            {
                balance -= item.Value;
            }
            foreach (KeyValuePair<string, int> item in OwedBy)
            {
                balance += item.Value;
            }
            return balance;
        }
    }
}
public class IOURequest
{
    [JsonProperty("lender")]
    public string LenderName { get; set; }
    [JsonProperty("borrower")]
    public string BorrowerName { get; set;}
    [JsonProperty("amount")]
    public int Amount { get; set; }
}
public class GetUserRequest
{
    [JsonProperty("users")]
    public IEnumerable<string> UserNames { get; set; }
}
public class AddUserRequest
{
    [JsonProperty("user")]
    public string UserName { get; set; }
}
public class RestApi
{
    private readonly List<User>? _users = [];
    public RestApi(string database)
    {
        _users = JsonConvert.DeserializeObject<List<User>>(database);
        if (_users is null) throw new ArgumentException();
    }

    public string? Get(string url, string? payload = null)
    {
        if (url != "/users") return null;
        if (payload is null) return JsonConvert.SerializeObject(_users);

        var request = JsonConvert.DeserializeObject<GetUserRequest>(payload);
        if (request is null) throw new ArgumentException();
        
        var response = _users.Where(x => request.UserNames.Contains(x.Name));
        return JsonConvert.SerializeObject(response);
    }

    public string Post(string url, string payload)
    {
        if (url == "/add")
        {
            var request = JsonConvert.DeserializeObject<AddUserRequest>(payload);
            var newUser = new User()
            {
                Name = request.UserName
            };

            _users.Add(newUser);
            return JsonConvert.SerializeObject(newUser);
        }
        else if (url == "/iou")
        {
            var request = JsonConvert.DeserializeObject<IOURequest>(payload);
            if (request is null) throw new ArgumentException();

            var lender = _users.Find(x => x.Name == request.LenderName);
            var borrower = _users.Find(x => x.Name == request.BorrowerName);
            if (lender is null || borrower is null) throw new ArgumentException();
            
            if (!lender.Owes.ContainsKey(request.BorrowerName))
            {
                lender.OwedBy.Add(borrower.Name, request.Amount);
            }
            if (lender.Owes.ContainsKey(request.BorrowerName))
            {
                lender.Owes[borrower.Name] -= request.Amount;
            }
            if (!borrower.OwedBy.ContainsKey(lender.Name))
            {
                borrower.Owes.Add(lender.Name, request.Amount);
            }
            if (borrower.OwedBy.ContainsKey(lender.Name))
            {
                borrower.OwedBy[lender.Name] -= request.Amount;
            }

            CleanRecords(lender, borrower.Name);
            CleanRecords(borrower, lender.Name);
            return JsonConvert.SerializeObject(_users.Where(x => x.Name == lender.Name ||
                                                                 x.Name == borrower.Name)
                                                           .OrderBy(x => x.Name));
        }
        throw new ArgumentException();
    }
    private static User CleanRecords(User user, string other)
    {
        if (user.Owes.ContainsKey(other))
        {
            if (user.Owes[other] == 0) user.Owes.Remove(other);
            else if (user.Owes[other] < 0)
            {
                user.OwedBy[other] = -user.Owes[other];
                user.Owes.Remove(other);
            }
        }
        if (user.OwedBy.ContainsKey(other))
        {
            if (user.OwedBy[other] == 0) user.OwedBy.Remove(other);
            else if (user.OwedBy[other] < 0)
            {
                user.Owes[other] = -user.OwedBy[other];
                user.OwedBy.Remove(other);
            }
        }
        return user;
    }
}