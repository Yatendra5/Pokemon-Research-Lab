export default function parseCommand(command) {
  const cmd = command.trim().toLowerCase();

  // set hp to 100 for all pokemon of type 'grass'
  let m = cmd.match(/^set\s+(\w+)\s+to\s+(.+)\s+for\s+all\s+pokemon\s+of\s+type\s+'?"?([\w -]+)'?"?$/);
  if (m) return { type: "setFieldByType", field: m[1], value: m[2].trim(), ptype: m[3].trim() };

  // delete rows where generation is 1
  m = cmd.match(/^delete\s+rows\s+where\s+(\w+)\s+is\s+(.+)$/);
  if (m) return { type: "deleteWhere", field: m[1], value: m[2].trim() };

  // update ability to 'levitate' where name is 'gengar'
  m = cmd.match(/^update\s+(\w+)\s+to\s+['"]?(.+?)['"]?\s+where\s+(\w+)\s+is\s+['"]?(.+?)['"]?$/);
  if (m) return { type: "updateWhere", field: m[1], value: m[2].trim(), whereField: m[3], whereValue: m[4].trim() };

  return { type: "unknown" };
}
