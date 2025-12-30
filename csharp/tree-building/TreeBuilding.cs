public class TreeBuildingRecord
{
    public int ParentId { get; set; }
    public int RecordId { get; set; }
}

public class Tree
{
    public int Id { get; set; }
    public int ParentId { get; set; }
    public required List<Tree> Children { get; set; }
    public bool IsLeaf => Children.Count == 0;
}

public static class TreeBuilder
{
    public static Tree BuildTree(IEnumerable<TreeBuildingRecord> records)
    {
        var baseRecord = records.OrderBy(o => o.RecordId).ToList();
        var firstRecord = baseRecord.FirstOrDefault();
        if (baseRecord.Count == 0 || firstRecord!.ParentId != 0 || firstRecord.RecordId != 0) throw new ArgumentException();
        baseRecord.Remove(firstRecord);;

        var tree = new Tree()
        {
            Id = 0,
            ParentId = 0,
            Children = Add(0)    
        };
        
        List<Tree> Add(int parentId)
        {
            List<Tree> treeList = [];
            
            var n = records.Count();
            if (records.Select(r => r.RecordId).Distinct().Count() != n ||
                records.Any(r => r.RecordId < 0 || r.RecordId >= n)) throw new ArgumentException();
            foreach (var record in baseRecord.Where(r => r.ParentId == parentId).ToList())
            {
                if (record.ParentId > record.RecordId) throw new ArgumentException();

                treeList.Add(new Tree()
                {
                    Id = record.RecordId,
                    ParentId = parentId,
                    Children = Add(record.RecordId)
                });
                baseRecord.Remove(record);
            }
            return treeList;
        }
        if (baseRecord.Count != 0) throw new ArgumentException();;
        return tree;
    }
}