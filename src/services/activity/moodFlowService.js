import { addData, getData, deleteData } from "../apiService"

const getTodayDate = () => new Date().toISOString().split("T")[0];

export const saveMoodFlow = async ({ moodData, hashtagIds, currentUser }) => {
  try {
    const today = getTodayDate();


    const dailyList = await getData("daily_activity");
    let daily = dailyList.find(
      (item) => item.user_id === currentUser.id && item.date === today
    );
    if (!daily) {

      daily = await addData("daily_activity", {
        user_id: currentUser.id,
        date: today,
      });
    } else {
      const moodLogs = await getData("mood_log");
      const relatedMoodLogs = moodLogs.filter(
        (log) => log.activity_id === daily.id
      );

      for (const moodLog of relatedMoodLogs) {
        const allMoodHashtags = await getData("mood_hashtag");
        const relatedTags = allMoodHashtags.filter(
          (tag) => tag.mood_log_id === moodLog.id
        );
        for (const tag of relatedTags) {
          await deleteData("mood_hashtag", tag.id);
        }
        await deleteData("mood_log", moodLog.id);
      }
    }

    const mood_log = await addData("mood_log", {
      activity_id: daily.id,
      content: moodData.content || "",
      mood_id: moodData.mood_id,
    });

    const mood_hashtags = [];
    for (const hashtag_id of hashtagIds) {
      const mh = await addData("mood_hashtag", {
        mood_log_id: mood_log.id,
        hashtag_id: hashtag_id,
      });
      mood_hashtags.push(mh);
    }

    return { daily, mood_log, mood_hashtags };
  } catch (err) {
    console.error("Error in saveMoodFlow:", err);
    throw err;
  }
};

