import { update } from "./db";
import { getTaskIdByUuid } from "./tasks";
import { getRewardIdByUuid } from "./rewards";
import { getPenaltyIdByUuid } from "./penalties";

export async function addHistoryTransaction(
  userId: number,
  groupId: number,
  sourceType: string,
  sourceId: string,
  points: number
) {
  let itemId = 0;

  switch (sourceType) {
    case 'task':
      itemId = await getTaskIdByUuid(sourceId);
      break;
    case 'reward':
      itemId = await getRewardIdByUuid(sourceId);
      break;
    case 'penalty':
      itemId = await getPenaltyIdByUuid(sourceId);
      break;
    default:
      throw new Error('Invalid source type');
  }
  try {
    const sql = `INSERT INTO transactions (user_id, group_id, source_type, source_id, points, occurred_on) 
                 VALUES ($1, $2, $3, $4, $5, CURRENT_DATE)`;
    await update(sql, [userId, groupId, sourceType, itemId, points]);
  } catch (error) {
    if (error.code === '23505') {
      throw new Error('Duplicate transaction entry');
    }
    console.error('Error adding transaction history:', error);
    throw error;
  }

}
