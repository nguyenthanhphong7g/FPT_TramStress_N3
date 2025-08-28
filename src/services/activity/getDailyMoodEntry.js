import { getData } from "../apiService";

export const getDailyMoodEntry = async (userId, date = null) => {
  try {
    const allActivities = await getData("daily_activity");
    const allMoodLogs = await getData("mood_log");
    const allMoodHashtags = await getData("mood_hashtag");
    const allHashtags = await getData("hashtag");

    let userActivities = allActivities.filter((a) => a.user_id === userId);
    if (date) {
      userActivities = userActivities.filter((a) => a.date === date);
    }

    const results = [];

    for (const activity of userActivities) {
      const moodLog = allMoodLogs.find(
        (m) => m.activity_id === activity.id
      );
      if (!moodLog) continue;

      const relatedTags = allMoodHashtags.filter(
        (t) => t.mood_log_id === moodLog.id
      );

      const tagNames = relatedTags.map((t) => {
        const tag = allHashtags.find((h) => h.hashtag_id === t.hashtag_id);
        return tag ? `${tag.name}` : null;
      }).filter(Boolean);

      results.push({
        date: activity.date,
        value: moodLog.mood_id || 1,
        note: moodLog.content || "",
        hashtags: tagNames,
      });
    }

    return date ? results[0] || null : results;

  } catch (err) {
    return date ? null : [];
  }
};
