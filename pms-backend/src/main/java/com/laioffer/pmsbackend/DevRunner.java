package com.laioffer.pmsbackend;

import com.laioffer.pmsbackend.model.AlertEntity;
import com.laioffer.pmsbackend.model.UserEntity;
import com.laioffer.pmsbackend.model.enums.UserRole;
import com.laioffer.pmsbackend.repository.AlertRepository;
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
    private final UserRepository userRepository;

    public DevRunner(AlertRepository alertRepository, UserRepository userRepository) {
        this.alertRepository = alertRepository;
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
                        7L,   // createdBy: trustee user id
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
                        7L,
                        null
                )
        ));
    }
}
