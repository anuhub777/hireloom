package com.anubhav.hireloom_backend.service;

import com.anubhav.hireloom_backend.dto.DashboardStatsDTO;
import com.anubhav.hireloom_backend.entity.Application;
import com.anubhav.hireloom_backend.entity.User;
import com.anubhav.hireloom_backend.enums.ApplicationStatus;
import com.anubhav.hireloom_backend.repository.ApplicationRepository;
import com.anubhav.hireloom_backend.repository.UserRepository;
import com.anubhav.hireloom_backend.exception.ResourceNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    public ApplicationService(ApplicationRepository applicationRepository, UserRepository userRepository)
    {
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
    }

    public Application createApplication(Application application) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        application.setUser(user);

        return applicationRepository.save(application);
    }

    public List<Application> getAllApplications() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        return applicationRepository.findByUserEmail(email);
    }

    public Application getApplicationById(Long id) {
        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        return applicationRepository.findByIdAndUserEmail(id,email)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id));
    }

    public Application updateApplication(Long id, Application updatedApplication) {
        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
        Application existing = applicationRepository
                .findByIdAndUserEmail(id,email)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id));

        existing.setCompanyName(updatedApplication.getCompanyName());
        existing.setRole(updatedApplication.getRole());
        existing.setStatus(updatedApplication.getStatus());
        existing.setLocation(updatedApplication.getLocation());
        existing.setSalary(updatedApplication.getSalary());
        existing.setJobUrl(updatedApplication.getJobUrl());
        existing.setAppliedDate(updatedApplication.getAppliedDate());
        existing.setNotes(updatedApplication.getNotes());

        return applicationRepository.save(existing);
    }

    public void deleteApplication(Long id) {
        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
        Application application = applicationRepository
                .findByIdAndUserEmail(id, email)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id));
        applicationRepository.delete(application);
    }

    public DashboardStatsDTO getDashboardStats() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        long total = applicationRepository.countByUserEmail(email);
        long applied = applicationRepository.countByUserEmailAndStatus(email, ApplicationStatus.APPLIED);
        long oa = applicationRepository.countByUserEmailAndStatus(email, ApplicationStatus.OA);
        long interview = applicationRepository.countByUserEmailAndStatus(email, ApplicationStatus.INTERVIEW);
        long rejected = applicationRepository.countByUserEmailAndStatus(email, ApplicationStatus.REJECTED);
        long offer = applicationRepository.countByUserEmailAndStatus(email, ApplicationStatus.OFFER);

        return new DashboardStatsDTO(
                total, applied, oa, interview, rejected, offer
        );
    }
}
