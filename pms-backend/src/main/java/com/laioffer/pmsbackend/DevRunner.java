package com.laioffer.pmsbackend;

import com.laioffer.pmsbackend.model.AlertEntity;
import com.laioffer.pmsbackend.model.AnnouncementEntity;
import com.laioffer.pmsbackend.model.PostEntity;
import com.laioffer.pmsbackend.model.UserEntity;
import com.laioffer.pmsbackend.model.enums.PostStatus;
import com.laioffer.pmsbackend.model.enums.UserRole;
import com.laioffer.pmsbackend.repository.AlertRepository;
import com.laioffer.pmsbackend.repository.AnnouncementRepository;
import com.laioffer.pmsbackend.repository.PostRepository;
import com.laioffer.pmsbackend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DevRunner implements ApplicationRunner {

    static private final Logger logger = LoggerFactory.getLogger(DevRunner.class);

    private final AlertRepository alertRepository;
    private final AnnouncementRepository announcementRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public DevRunner(
            AlertRepository alertRepository,
            AnnouncementRepository announcementRepository,
            PostRepository postRepository,
            UserRepository userRepository
    ) {
        this.alertRepository = alertRepository;
        this.announcementRepository = announcementRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        generateSampleData();
    }

    private void generateSampleData() {
        userRepository.saveAll(List.of(
                // ============================
                // RESIDENTS
                // ============================
                new UserEntity(null, "alice.wong", "alice@example.com", "$2a$10$abc123", UserRole.ROLE_RESIDENT, null),
                new UserEntity(null, "carla.lee", "carla.lee@example.com", "$2a$10$ghi789", UserRole.ROLE_RESIDENT, null),
                new UserEntity(null, "daniel.kim", "daniel.kim@example.com", "$2a$10$jkl012", UserRole.ROLE_RESIDENT, null),
                new UserEntity(null, "felix.yang", "felix.yang@example.com", "$2a$10$pqr678", UserRole.ROLE_RESIDENT, null),
                new UserEntity(null, "grace.lin", "grace.lin@example.com", "$2a$10$stu901", UserRole.ROLE_RESIDENT, null),
                new UserEntity(null, "isabella.hsu", "isabella.hsu@example.com", "$2a$10$yza567", UserRole.ROLE_RESIDENT, null),
                new UserEntity(null, "jack.chen", "jack.chen@example.com", "$2a$10$bcd890", UserRole.ROLE_RESIDENT, null),

                // ============================
                // TRUSTEES
                // ============================
                new UserEntity(null, "ben.chan.admin", "ben.chan@example.com", "$2a$10$def456", UserRole.ROLE_TRUSTEE, null),
                new UserEntity(null, "emily.zhou.admin", "emily.zhou@example.com", "$2a$10$mno345", UserRole.ROLE_TRUSTEE, null),
                new UserEntity(null, "henry.tan.admin", "henry.tan@example.com", "$2a$10$vwx234", UserRole.ROLE_TRUSTEE, null)
        ));

        alertRepository.saveAll(List.of(
                new AlertEntity(
                        null,
                        "Planned Fire Alarm Testing – March 12",
                        "Our building-wide fire alarm system will be tested on Wednesday, March 12 "
                                + "between 10:00 AM and 11:00 AM. Alarms will sound intermittently during "
                                + "this period. Please do not use the elevators during testing and do not "
                                + "call emergency services unless you see real smoke or fire.",
                        List.of(
                                "https://images.pexels.com/photos/12997193/pexels-photo-12997193.jpeg"
                        ),
                        8L,
                        null  // createdAt handled by @CreationTimestamp
                ),
                new AlertEntity(
                        null,
                        "Mechanical Room Maintenance – Possible Hot Water Fluctuations",
                        "Our maintenance team will be servicing the main boiler and plumbing manifolds "
                                + "on Friday between 9:00 AM and 3:00 PM. You may experience brief periods "
                                + "of low water pressure or lukewarm water. We apologize for the inconvenience "
                                + "and appreciate your understanding while we keep the building systems safe.",
                        List.of(
                                "https://images.pexels.com/photos/586019/pexels-photo-586019.jpeg"
                        ),
                        8L,
                        null
                ),
                new AlertEntity(
                        null,
                        "Parking Garage Safety Notice",
                        "Following a recent incident in the underground parking garage, we have increased "
                                + "security patrols and camera monitoring. Please ensure you lock your vehicle, "
                                + "avoid leaving valuables in plain sight, and report any suspicious activity to "
                                + "the concierge or security team immediately.",
                        List.of(
                                "https://images.pexels.com/photos/10500240/pexels-photo-10500240.jpeg"
                        ),
                        9L,
                        null
                ),
                new AlertEntity(
                        null,
                        "Indoor Pool – Temporary Closure for Deep Cleaning",
                        "The indoor pool and adjacent lounge area will be closed for deep cleaning and "
                                + "water quality treatment from Monday to Wednesday. During this time, access "
                                + "to the pool deck will be restricted. We will reopen the facility once "
                                + "all maintenance checks and water tests are complete.",
                        List.of(
                                "https://images.pexels.com/photos/7061661/pexels-photo-7061661.jpeg"
                        ),
                        10L,
                        null
                ),
                new AlertEntity(
                        null,
                        "No Smoking in Hallways, Elevators, and Common Areas",
                        "This is a reminder that smoking and vaping are strictly prohibited in all indoor "
                                + "common areas, including hallways, stairwells, elevators, and the lobby. "
                                + "Repeated violations may result in fines in accordance with the community "
                                + "bylaws. Thank you for helping us maintain a healthy environment for all residents.",
                        null,   // this one intentionally has no image
                        8L,
                        null
                )
        ));

        announcementRepository.saveAll(List.of(
                new AnnouncementEntity(
                        null,
                        "Monthly Community Meeting – March 28",
                        "Our next community meeting will take place on Friday, March 28 at 6:00 PM in the lobby lounge. "
                                + "Topics include spring maintenance updates and upcoming amenity improvements.",
                        8L,
                        List.of("https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg"),
                        null
                ),
                new AnnouncementEntity(
                        null,
                        "Package Room Upgrade Completed",
                        "The package room renovation is officially finished! Residents may now pick up parcels using "
                                + "the updated digital locker system. Instructions will be emailed tomorrow.",
                        8L,
                        List.of("https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg"),
                        null
                ),
                new AnnouncementEntity(
                        null,
                        "Spring Cleaning Week Starts Monday",
                        "Building staff will conduct annual spring cleaning next week. Please keep hallways clear "
                                + "and avoid leaving items outside your unit.",
                        9L,
                        null,   // this announcement has no image
                        null
                )
        ));

        postRepository.saveAll(List.of(
                new PostEntity(
                        null,
                        1L,
                        "Does anyone know when the gym will reopen?",
                        PostStatus.ACTIVE,
                        List.of("https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg"),
                        null
                ),
                new PostEntity(
                        null,
                        2L,
                        "Looking to rent a parking spot for April.",
                        PostStatus.ACTIVE,
                        null,
                        null
                ),
                new PostEntity(
                        null,
                        3L,
                        "Selling a lightly used dining table, DM for pics.",
                        PostStatus.ACTIVE,
                        List.of("https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg"),
                        null
                ),
                new PostEntity(
                        null,
                        4L,
                        "Found a key near elevator B. Message me if it’s yours.",
                        PostStatus.ACTIVE,
                        null,
                        null
                ),
                new PostEntity(
                        null,
                        5L,
                        "Anyone interested in forming a morning running group?",
                        PostStatus.ACTIVE,
                        null,
                        null
                ),
                new PostEntity(
                        null,
                        6L,
                        "Leasing out my parking spot for 2 months. PM if interested.",
                        PostStatus.ACTIVE,
                        null,
                        null
                ),
                new PostEntity(
                        null,
                        7L,
                        "Noise coming from 10th floor last night—anyone else hear it?",
                        PostStatus.ACTIVE,
                        null,
                        null
                ),
                new PostEntity(
                        null,
                        8L,
                        "Organizing a board game night this Saturday. All welcome!",
                        PostStatus.ACTIVE,
                        List.of("https://images.pexels.com/photos/411207/pexels-photo-411207.jpeg"),
                        null
                ),
                new PostEntity(
                        null,
                        9L,
                        "Looking for recommendations for a cleaning service.",
                        PostStatus.ACTIVE,
                        null,
                        null
                ),
                new PostEntity(
                        null,
                        10L,
                        "Lost a small black umbrella in the lobby. Please let me know if found.",
                        PostStatus.ACTIVE,
                        null,
                        null
                )
        ));
    }
}
